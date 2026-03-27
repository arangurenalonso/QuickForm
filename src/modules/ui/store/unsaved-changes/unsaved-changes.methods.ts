export const UNSAVED_CHANGES_SCOPE_PREFIX = {
  formBuilder: 'form-builder',
  formSettings: 'form-settings',
  formPublish: 'form-publish',
  profileEdit: 'profile-edit',
} as const;

const buildScope = (prefix: string, id?: string | null): string => {
  return id ? `${prefix}:${id}` : prefix;
};

export const UnsavedChangesScope = {
  formBuilder: (idForm?: string | null) =>
    buildScope(UNSAVED_CHANGES_SCOPE_PREFIX.formBuilder, idForm),

  formSettings: (idForm?: string | null) =>
    buildScope(UNSAVED_CHANGES_SCOPE_PREFIX.formSettings, idForm),

  formPublish: (idForm?: string | null) =>
    buildScope(UNSAVED_CHANGES_SCOPE_PREFIX.formPublish, idForm),

  profileEdit: (idProfile?: string | null) =>
    buildScope(UNSAVED_CHANGES_SCOPE_PREFIX.profileEdit, idProfile),
} as const;
