export interface Dictionary {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    keywords: string[];
    titles: {
      about: string;
      experience: string;
      projects: string;
      skills: string;
      contact: string;
      vault: string;
    };
  };
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
    vault: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    description: string;
    subdescription: string;
    cta_primary: string;
    cta_secondary: string;
    typing_texts: string[];
    badge: string;
    stats: Array<{ value: string; label: string }>;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    details_title: string;
    details: {
      name: string;
      location: string;
      experience: string;
      specialization: string;
      email: string;
      languages: string;
      age?: string;
      family?: string;
      hobbies?: string;
      memberships?: string;
    };
    stats: Record<string, string>;
    quote: string;
    looking_for: {
      title: string;
      content: string;
    };
    download_cv: string;
  };
  experience: {
    title: string;
    subtitle: string;
    current_role: string;
    items: Array<{
      id: string;
      company: string;
      companyUrl?: string;
      position: string;
      period: string;
      description: string;
      technologies: string[];
      type: 'work' | 'edu' | 'cert';
    }>;
  };
  projects: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      category: string;
      description: string;
      details?: string;
      features?: string[];
      tech: string[];
      link: string;
      githubLink?: string;
      logo?: string;
      images?: string[];
    }>;
  };
  skills: {
    title: string;
    subtitle: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
    categories: Array<{
      name: string;
      icon: string;
      description: string;
      items: string[];
    }>;
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    info_title: string;
    documents_title: string;
    documents_description: string;
    vault_card_title: string;
    vault_card_subtitle: string;
    form: {
      title: string;
      subtitle: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      placeholder_name: string;
      placeholder_email: string;
      placeholder_message: string;
    };
  };
  vault: {
    title: string;
    description: string;
    placeholder: string;
    button: string;
    error: string;
    hint: string;
    locked_title: string;
    unlocked_title: string;
    contact_info: {
      name: string;
      address: string;
      email: string;
      phone: string;
      logout: string;
      logout_confirm: string;
      logout_cancel: string;
      logout_message: string;
    };
    documents: {
      cv: DocumentDetails;
      ihk: DocumentDetails;
      msm: DocumentDetails;
      scrum: DocumentDetails;
    };
    back_to_site: string;
    preview: string;
    download: string;
    download_pdf: string;
    download_word: string;
    confidential_notice: string;
    contact_questions: string;
  };
  error: {
    "404": {
      title: string;
      description: string;
      back_home: string;
      contact: string;
    };
  };
}

interface DocumentDetails {
  title: string;
  location: string;
  provider: string;
  degree: string;
  type: string;
}
