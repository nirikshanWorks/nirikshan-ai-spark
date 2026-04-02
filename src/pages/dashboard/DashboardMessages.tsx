import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send, ArrowLeft, Plus, Users, Search, Paperclip, Smile } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const DashboardMessages = () => {
  const { user, profile } = useCrmAuth();
  const { toast } = useToast();
  const [groups, setGroups] = useState<any[]>([]);
  const [activeGroup, setActiveGroup] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [showNewChat, setShowNewChat] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchChat, setSearchChat] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchGroups = useCallback(async () => {
    if (!user) return;
    const { data: memberData } = await supabase.from("chat_members").select("group_id").eq("user_id", user.id);
    if (!memberData?.length) { setGroups([]); return; }
    const groupIds = memberData.map(m => m.group_id);
    const { data: groupData } = await supabase.from("chat_groups").select("*").in("id", groupIds).order("created_at", { ascending: false });
    setGroups(groupData || []);
  }, [user]);

  useEffect(() => {
    fetchGroups();
    supabase.from("profiles").select("id, full_name, email, avatar_url").then(({ data }) => setProfiles(data || []));
  }, [fetchGroups]);

  // Fetch messages for active group
  useEffect(() => {
    if (!activeGroup) return;
    const fetchMessages = async () => {
      const { data } = await supabase.from("chat_messages").select("*")
        .eq("group_id", activeGroup.id).order("created_at", { ascending: true }).limit(50);
      setMessages(data || []);
    };
    fetchMessages();

    // Fetch members
    supabase.from("chat_members").select("*").eq("group_id", activeGroup.id).then(({ data }) => setMembers(data || []));

    // Realtime subscription
    const channel = supabase.channel(`chat-${activeGroup.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `group_id=eq.${activeGroup.id}` },
        (payload) => { setMessages(prev => [...prev, payload.new]); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeGroup]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeGroup || !user) return;
    const { error } = await supabase.from("chat_messages").insert({
      group_id: activeGroup.id,
      sender_id: user.id,
      content: newMessage.trim(),
      message_type: "text",
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setNewMessage("");
  };

  const startDirectChat = async (targetUserId: string) => {
    if (!user) return;
    // Check if direct chat already exists
    const { data: myGroups } = await supabase.from("chat_members").select("group_id").eq("user_id", user.id);
    if (myGroups?.length) {
      const { data: theirGroups } = await supabase.from("chat_members").select("group_id").eq("user_id", targetUserId);
      const commonGroupIds = myGroups.filter(mg => theirGroups?.some(tg => tg.group_id === mg.group_id)).map(g => g.group_id);
      if (commonGroupIds.length) {
        const { data: existingDirect } = await supabase.from("chat_groups").select("*")
          .in("id", commonGroupIds).eq("type", "direct").limit(1);
        if (existingDirect?.length) {
          setActiveGroup(existingDirect[0]);
          setShowNewChat(false);
          setMobileShowChat(true);
          return;
        }
      }
    }
    // Create new direct chat
    const targetProfile = profiles.find(p => p.id === targetUserId);
    const { data: newGroup, error } = await supabase.from("chat_groups").insert({
      type: "direct",
      name: null,
      created_by: user.id,
    }).select().single();
    if (error || !newGroup) { toast({ title: "Error", description: error?.message, variant: "destructive" }); return; }
    await supabase.from("chat_members").insert([
      { group_id: newGroup.id, user_id: user.id, role: "admin" },
      { group_id: newGroup.id, user_id: targetUserId, role: "member" },
    ]);
    setActiveGroup(newGroup);
    setShowNewChat(false);
    setMobileShowChat(true);
    fetchGroups();
  };

  const createGroup = async () => {
    if (!groupName.trim() || !user || selectedMembers.length === 0) return;
    const { data: newGroup, error } = await supabase.from("chat_groups").insert({
      type: "group",
      name: groupName.trim(),
      created_by: user.id,
    }).select().single();
    if (error || !newGroup) { toast({ title: "Error", variant: "destructive" }); return; }
    const memberInserts = [user.id, ...selectedMembers].map(uid => ({
      group_id: newGroup.id,
      user_id: uid,
      role: uid === user.id ? "admin" : "member",
    }));
    await supabase.from("chat_members").insert(memberInserts);
    setActiveGroup(newGroup);
    setShowNewGroup(false);
    setGroupName("");
    setSelectedMembers([]);
    setMobileShowChat(true);
    fetchGroups();
  };

  const getGroupDisplayName = (group: any) => {
    if (group.name) return group.name;
    // For direct chats, show the other person's name
    const otherMember = members.find(m => m.user_id !== user?.id) || { user_id: "" };
    const otherProfile = profiles.find(p => p.id === otherMember.user_id);
    return otherProfile?.full_name || otherProfile?.email || "Direct Chat";
  };

  const getSenderName = (senderId: string) => {
    const p = profiles.find(pr => pr.id === senderId);
    return p?.full_name || p?.email || "Unknown";
  };

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-xl border border-[#1A2C45] overflow-hidden" style={{ background: "#0A1628" }}>
      {/* Left Panel - Chat List */}
      <div className={`w-full lg:w-80 border-r border-[#1A2C45] flex flex-col shrink-0 ${mobileShowChat ? "hidden lg:flex" : "flex"}`}>
        <div className="p-3 border-b border-[#1A2C45] space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#556677]" />
              <Input value={searchChat} onChange={e => setSearchChat(e.target.value)} placeholder="Search chats..."
                className="pl-8 h-8 text-xs bg-[#0F1E35] border-[#1A2C45] text-white placeholder:text-[#556677]" />
            </div>
            <Button size="icon" variant="ghost" onClick={() => setShowNewChat(true)} className="h-8 w-8 text-[#00D4FF] hover:bg-[#00D4FF]/10">
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setShowNewGroup(true)} className="h-8 w-8 text-[#00D4FF] hover:bg-[#00D4FF]/10">
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#556677] text-sm p-4 text-center">
              <MessageCircleIcon className="h-12 w-12 mb-3 opacity-30" />
              <p>No conversations yet</p>
              <p className="text-xs mt-1">Start a new chat or create a group</p>
            </div>
          ) : groups.filter(g => !searchChat || g.name?.toLowerCase().includes(searchChat.toLowerCase())).map(group => (
            <div key={group.id} onClick={() => { setActiveGroup(group); setMobileShowChat(true); }}
              className={`flex items-center gap-3 p-3 cursor-pointer border-b border-[#1A2C45]/30 transition
                ${activeGroup?.id === group.id ? "bg-[#00D4FF]/5" : "hover:bg-[#0F1E35]"}`}>
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-[#1A2C45] text-[#00D4FF] text-xs">
                  {group.type === "group" ? <Users className="h-4 w-4" /> : getInitials(getGroupDisplayName(group))}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{getGroupDisplayName(group)}</p>
                <p className="text-[10px] text-[#556677]">{group.type === "group" ? "Group" : "Direct"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className={`flex-1 flex flex-col ${!mobileShowChat ? "hidden lg:flex" : "flex"}`}>
        {activeGroup ? (
          <>
            {/* Chat Header */}
            <div className="h-14 flex items-center gap-3 px-4 border-b border-[#1A2C45] shrink-0">
              <button onClick={() => setMobileShowChat(false)} className="lg:hidden text-[#8899AA] hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-[#1A2C45] text-[#00D4FF] text-xs">
                  {activeGroup.type === "group" ? <Users className="h-4 w-4" /> : getInitials(getGroupDisplayName(activeGroup))}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-white">{getGroupDisplayName(activeGroup)}</p>
                <p className="text-[10px] text-[#556677]">{members.length} members</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => {
                const isMine = msg.sender_id === user?.id;
                const isDeleted = msg.is_deleted;
                return (
                  <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      isMine ? "bg-[#00D4FF] text-[#050A14] rounded-br-md" : "bg-[#1A2C45] text-white rounded-bl-md"
                    }`}>
                      {activeGroup.type === "group" && !isMine && (
                        <p className="text-[10px] font-semibold mb-0.5 opacity-70">{getSenderName(msg.sender_id)}</p>
                      )}
                      {isDeleted ? (
                        <p className="text-sm italic opacity-60">This message was deleted</p>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                      )}
                      <p className={`text-[9px] mt-1 ${isMine ? "text-[#050A14]/50" : "text-[#556677]"}`}>
                        {format(new Date(msg.created_at), "hh:mm a")}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#1A2C45] flex items-center gap-2">
              <Input value={newMessage} onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                placeholder="Type a message..."
                className="flex-1 bg-[#0F1E35] border-[#1A2C45] text-white placeholder:text-[#556677] focus-visible:ring-[#00D4FF]" />
              <Button onClick={sendMessage} disabled={!newMessage.trim()} size="icon"
                className="bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14] shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#556677]">
            <div className="text-center">
              <MessageCircleIcon className="h-16 w-16 mx-auto mb-3 opacity-20" />
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm mt-1">or start a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* New Direct Chat Dialog */}
      <Dialog open={showNewChat} onOpenChange={setShowNewChat}>
        <DialogContent className="bg-[#0F1E35] border-[#1A2C45] text-white max-w-sm">
          <DialogHeader><DialogTitle className="text-white">New Chat</DialogTitle></DialogHeader>
          <div className="space-y-1 max-h-[50vh] overflow-y-auto">
            {profiles.filter(p => p.id !== user?.id).map(p => (
              <div key={p.id} onClick={() => startDirectChat(p.id)}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#0A1628] transition">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={p.avatar_url || undefined} />
                  <AvatarFallback className="bg-[#1A2C45] text-[#00D4FF] text-xs">{getInitials(p.full_name || p.email)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{p.full_name || p.email}</p>
                  <p className="text-[10px] text-[#556677]">{p.email}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* New Group Dialog */}
      <Dialog open={showNewGroup} onOpenChange={setShowNewGroup}>
        <DialogContent className="bg-[#0F1E35] border-[#1A2C45] text-white max-w-sm">
          <DialogHeader><DialogTitle className="text-white">Create Group</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Group name" value={groupName} onChange={e => setGroupName(e.target.value)}
              className="bg-[#0A1628] border-[#1A2C45] text-white placeholder:text-[#556677]" />
            <p className="text-xs text-[#556677]">Select members:</p>
            <div className="space-y-1 max-h-[40vh] overflow-y-auto">
              {profiles.filter(p => p.id !== user?.id).map(p => (
                <label key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#0A1628] cursor-pointer">
                  <input type="checkbox" checked={selectedMembers.includes(p.id)}
                    onChange={e => setSelectedMembers(prev => e.target.checked ? [...prev, p.id] : prev.filter(id => id !== p.id))}
                    className="rounded border-[#1A2C45] bg-[#0A1628] text-[#00D4FF]" />
                  <span className="text-sm">{p.full_name || p.email}</span>
                </label>
              ))}
            </div>
            <Button onClick={createGroup} disabled={!groupName.trim() || selectedMembers.length === 0}
              className="w-full bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14]">Create Group</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Simple placeholder icon
const MessageCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

export default DashboardMessages;
