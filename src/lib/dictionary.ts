export interface Dictionary {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    keywords: string[];
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
    };
    stats: Record<string, string>;
    quote: string;
    download_cv: string;
  };
  experience: {
    title: string;
    subtitle: string;
    current_role: string;
    items: Array<{
      id: string;
      company: string;
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
      tech: string[];
      link: string;
    }>;
  };
  skills: {
    title: string;
    subtitle: string;
    description: string;
    categories: Array<{
      name: string;
      items: string[];
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    info_title: string;
    form: {
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
    documents: {
      cv: DocumentDetails;
      ihk: DocumentDetails;
      msm: DocumentDetails;
      scrum: DocumentDetails;
    };
    back_to_site: string;
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
