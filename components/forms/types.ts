export type FormState = {
  business_name: string;
  business_type: string;
  years_operating: string;
  current_website_url: string;
  instagram_handle: string;
  facebook_handle: string;
  activity_level: string;
  google_profile_url: string;
  google_review_count: string;
  services_description: string;
  biggest_challenge: string;
  content_readiness: string;
  credentials: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  consent_terms: boolean;
  consent_feedback: boolean;
};

export const initialFormState: FormState = {
  business_name: "",
  business_type: "",
  years_operating: "",
  current_website_url: "",
  instagram_handle: "",
  facebook_handle: "",
  activity_level: "",
  google_profile_url: "",
  google_review_count: "",
  services_description: "",
  biggest_challenge: "",
  content_readiness: "",
  credentials: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  consent_terms: false,
  consent_feedback: false,
};

export type FieldErrors = Partial<Record<string, string>>;
