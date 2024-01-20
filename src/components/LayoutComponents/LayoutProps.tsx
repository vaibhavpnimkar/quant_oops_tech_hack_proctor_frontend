export interface LProps {
  links: {
    target: string;
    title: string;
    icon: React.ReactNode; // or string ???
  }[];
}

export interface NProps extends LProps {
    email: string;
    name: string;
}