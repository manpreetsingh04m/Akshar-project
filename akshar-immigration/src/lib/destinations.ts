export const destinationVisuals: Record<
  string,
  { name: string; image: string; blurb?: string }
> = {
  uk: {
    name: "United Kingdom",
    blurb: "Study, Skilled Worker, family & visits",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
  },
  canada: {
    name: "Canada",
    blurb: "Study, work, Express Entry & sponsorship",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=80",
  },
  australia: {
    name: "Australia",
    blurb: "Student and skilled migration",
    // Previous Unsplash id 404'd — Sydney Opera House
    image:
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&w=1600&q=80",
  },
  usa: {
    name: "United States",
    blurb: "F-1, temporary work & visitor",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1600&q=80",
  },
  schengen: {
    name: "Schengen",
    blurb: "Italy, France, Germany, Spain + more",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80",
  },
};
