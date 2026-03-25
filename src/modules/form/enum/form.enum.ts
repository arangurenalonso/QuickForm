export enum FORM_ACTION {
  Pause = 'FormPause',
  ViewSubmissions = 'ViewSubmissions',
  Resume = 'FormResume',
  Publish = 'FormPublish',
  Edit = 'FormEdit',
  Close = 'FormClose',
  AllowSubmission = 'AllowSubmission',
}

const FORM_ACTION_VALUES = Object.values(FORM_ACTION);

export function isFormAction(value: unknown): value is FORM_ACTION {
  return (
    typeof value === 'string' &&
    FORM_ACTION_VALUES.includes(value as FORM_ACTION)
  );
}
export function isFormActionArray(value: unknown): value is FORM_ACTION[] {
  return Array.isArray(value) && value.every(isFormAction);
}
