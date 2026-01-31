'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/libs/ui/select';
import {
  PreviewFormVariant,
  PREVIEW_FORM_VARIANTS,
} from './PreviewFormVariant';

type Props = {
  value: PreviewFormVariant;
  onChange: (v: PreviewFormVariant) => void;
};

export default function PreviewFormVariantPicker({ value, onChange }: Props) {
  return (
    <div className="px-4 pt-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Preview layout</p>
          <p className="text-xs text-muted-foreground">
            Choose how sections are rendered.
          </p>
        </div>

        <Select
          value={value}
          onValueChange={(v) => onChange(v as PreviewFormVariant)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            {PREVIEW_FORM_VARIANTS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
