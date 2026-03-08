'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useRef } from 'react';

export interface SocialLink {
  id: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}

export interface ProfileCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  location: string;
  bio: string;
  avatarSrc: string;
  avatarFallback: string;
  variant?: 'default' | 'on-accent';
  socials?: SocialLink[];
  showAvatar?: boolean;
  titleStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  descriptionClassName?: string;
  bioClassName?: string;
  footerClassName?: string;
}

export const ProfileCardContent = React.forwardRef<
  HTMLDivElement,
  ProfileCardContentProps
>(
  (
    {
      className,
      name,
      location,
      bio,
      avatarSrc,
      avatarFallback,
      variant = 'default',
      socials = [],
      showAvatar = true,
      titleStyle,
      cardStyle,
      descriptionClassName,
      bioClassName,
      footerClassName,
      ...props
    },
    ref
  ) => {
    const isOnAccent = variant === 'on-accent';

    return (
      <Card
        ref={ref}
        className={cn(
          'w-full max-w-sm border-none shadow-none h-full flex flex-col',
          isOnAccent ? 'bg-transparent' : 'bg-card',
          className
        )}
        style={cardStyle}
        {...props}
      >
        <CardHeader className="flex flex-col items-start gap-3">
          <div
            className={cn(
              'transition-opacity duration-300',
              showAvatar ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-offset-background ring-primary">
              <AvatarImage src={avatarSrc} alt={name} className="object-cover" />
              <AvatarFallback className="text-lg">{avatarFallback}</AvatarFallback>
            </Avatar>
          </div>

          <CardDescription
            className={cn(
              'text-xs font-medium uppercase tracking-widest',
              isOnAccent ? '' : 'text-muted-foreground',
              descriptionClassName
            )}
          >
            {location}
          </CardDescription>
          <CardTitle
            className={cn(
              'text-2xl font-bold',
              isOnAccent ? '' : 'text-foreground'
            )}
            style={titleStyle}
          >
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p
            className={cn(
              'text-sm leading-relaxed',
              isOnAccent ? '' : 'text-muted-foreground',
              bioClassName
            )}
          >
            {bio}
          </p>
        </CardContent>

        {socials.length > 0 && (
          <CardFooter className={cn('pt-0', footerClassName)}>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'transition-opacity hover:opacity-70',
                    isOnAccent ? '' : 'text-foreground'
                  )}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);
ProfileCardContent.displayName = 'ProfileCardContent';

export interface AnimatedProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  baseCard: React.ReactNode;
  overlayCard: React.ReactNode;
  accentColor?: string;
  onAccentForegroundColor?: string;
  onAccentMutedForegroundColor?: string;
}

export const AnimatedProfileCard = React.forwardRef<
  HTMLDivElement,
  AnimatedProfileCardProps
>(
  (
    {
      className,
      accentColor = 'var(--primary)',
      onAccentForegroundColor = '#ffffff',
      onAccentMutedForegroundColor = 'rgba(255, 255, 255, 0.8)',
      baseCard,
      overlayCard,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const overlayThemeClass = resolvedTheme === 'dark' ? 'light' : 'dark';

    const setContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const initialClipPath = 'circle(0px at 64px 64px)';
    const hoverClipPath = 'circle(150% at 64px 64px)';

    useGSAP(
      () => {
        gsap.set(overlayRef.current, { clipPath: initialClipPath });
      },
      { scope: containerRef }
    );

    const handleMouseEnter = () => {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        clipPath: hoverClipPath,
        duration: 0.7,
        ease: 'expo.inOut',
      });
    };

    const handleMouseLeave = () => {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        clipPath: initialClipPath,
        duration: 1.2,
        ease: 'expo.out(1, 1)',
      });
    };

    return (
      <div
        ref={setContainerRef}
        className={cn('relative w-full max-w-sm cursor-pointer h-full', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="relative z-0 rounded-xl border border-border bg-card p-2">
          {baseCard}
        </div>

        <div
          ref={overlayRef}
          className={cn('absolute inset-0 z-10 rounded-xl p-2', overlayThemeClass)}
          style={{
            backgroundColor: accentColor,
            color: onAccentForegroundColor,
            ['--on-accent-muted' as string]: onAccentMutedForegroundColor,
          }}
        >
          {overlayCard}
        </div>
      </div>
    );
  }
);
AnimatedProfileCard.displayName = 'AnimatedProfileCard';
