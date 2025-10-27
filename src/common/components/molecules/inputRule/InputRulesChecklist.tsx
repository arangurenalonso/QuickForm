// app/components/ChecklistReglasPassword.tsx
'use client';

import * as React from 'react';
import { cn } from '@/common/libs/utils';
import InputRuleItem from './InputRuleItem';
import { RulesValidate } from './type';

type InputRulesChecklistProps = {
  value: string;
  id?: string;
  className?: string;
  rules: RulesValidate[];
};

const InputRulesChecklist = ({
  value,
  id = 'pwd-rules',
  className,
  rules,
}: InputRulesChecklistProps) => {
  const resultsMap = React.useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const r of rules) map[r.id] = r.test(value || '');
    return map;
  }, [rules, value]);

  return (
    <div className={cn('space-y-2', className)}>
      <div
        id={`${id}-help`}
        className="grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-6"
      >
        <ul className="space-y-1">
          {rules
            .filter((r) => r.group !== 'right')
            .map((r) => (
              <InputRuleItem key={r.id} pass={resultsMap[r.id]}>
                {r.label}
              </InputRuleItem>
            ))}
        </ul>
        <ul className="space-y-1">
          {rules
            .filter((r) => r.group === 'right')
            .map((r) => (
              <InputRuleItem key={r.id} pass={resultsMap[r.id]}>
                {r.label}
              </InputRuleItem>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default InputRulesChecklist;
