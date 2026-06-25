'use client';

import { Language } from '@commet/shared';
import { Avatar, Badge, Button, Card } from '@/components/ui';
import type { BabyProfile } from '@/lib/api';
import { ageLabel } from '@/lib/age';

const CHARACTER_IDS = ['cometinho', 'lila', 'dino', 'nina', 'nuvito'];

export function BabyProfileCard({
  profile,
  onEdit,
  onDelete,
}: {
  profile: BabyProfile;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const isCharacter = CHARACTER_IDS.includes(profile.avatarId);
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <Avatar
          src={isCharacter ? `/brand/char-${profile.avatarId}.png` : undefined}
          name={profile.name}
          ring={isCharacter ? profile.avatarId : 'lavender'}
          size="lg"
        />
        <div style={{ minWidth: 0 }}>
          <strong style={{ color: 'var(--text-strong)', display: 'block' }}>{profile.name}</strong>
          <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>
            {ageLabel(profile.birthDate)}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <Badge tone={profile.languagePref === Language.EN ? 'sky' : 'mint'}>
          {profile.languagePref === Language.EN ? 'Bilíngue (EN)' : 'PT-BR'}
        </Badge>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Editar
        </Button>
        <Button variant="soft" size="sm" onClick={onDelete}>
          Remover
        </Button>
      </div>
    </Card>
  );
}
