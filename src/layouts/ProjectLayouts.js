
const projectLayouts = {
  // Base layout templates that can be reused across projects
  templates: {
    // Primary template for horizontal-focused images (our standardized template)
    horizontalStandard: {
      layout: "horizontal",
      heroStyle: {
        textPosition: "bottom-left",
        overlayOpacity: 0,
        imageStyle: "cover",
        imageColorFilter: "none",
      },
      galleryConfig: {
        spacing: "medium",
        imageEffects: {
          hover: "scale",
          transition: "medium",
        },
        // Optimized for horizontal images with consistent aspect ratios
        customImageStyles: {
          0: { aspectRatio: "21/9", colSpan: 2 },  // Hero image (full width)
          1: { aspectRatio: "16/9", colSpan: 2 },  // Secondary feature (full width)
          2: { aspectRatio: "16/9", colSpan: 1 },  // Standard horizontal (half width)
          3: { aspectRatio: "16/9", colSpan: 1 },  // Standard horizontal (half width)
          4: { aspectRatio: "16/9", colSpan: 1 },  // Standard horizontal (half width)
          5: { aspectRatio: "16/9", colSpan: 1 },  // Standard horizontal (half width)
        },
        imageText: {
          0: { title: "", description: "" }  // Default empty text structure for the hero image
        }
      },
      contentStyle: {
        textSize: "medium",
        descriptionColumns: 1,
      }
    },
  },
  
  // Default layout to use if no specific configuration exists for a project
  default: {
    // Using our horizontalStandard template as default
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Project Showcase", description: "Featured design highlights" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  // Work Spaces Projects (1-11)
  "1": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Main Workspace", description: "Collaborative central area designed for team interaction" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "2": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Community Hub", description: "Central gathering space for events and collaboration" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "3": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Creative Studio", description: "Designed for focused work and creative collaboration" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "4": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Open Office Environment", description: "Modern workspace promoting transparency and collaboration" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "5": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Executive Suite", description: "Elegant workspace designed for leadership and decision-making" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "6": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Collaborative Hub", description: "Dynamic space designed for teamwork and innovation" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "7": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Tech Office", description: "Modern space optimized for digital collaboration and innovation" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "8": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Multipurpose Workspace", description: "Adaptable environment for various work activities" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "9": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Creative Workspace", description: "Inspiring environment for design and innovation" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "10": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Coworking Space", description: "Flexible workspace designed for productivity and networking" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "11": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Innovation Lab", description: "Space dedicated to experimentation and breakthrough thinking" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  // Food & Beverages Projects (12-14)
  "12": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Roasting Area", description: "Visible coffee production as a central design element" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "13": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Restaurant Interior", description: "Elegant dining space with focus on customer experience" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "14": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Café Design", description: "Warm and inviting space for casual dining and conversation" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  // Sports & Fitness Projects (15-19)
  "15": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Fitness Center", description: "Modern facility designed for optimal training experiences" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "16": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Training Facility", description: "Professional sports complex for elite athletic development" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "17": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Yoga Studio", description: "Serene environment for mindfulness and physical practice" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "18": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Sports Complex", description: "Comprehensive facility for multiple sports and activities" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "19": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Athletic Club", description: "Premium facility designed for fitness and community" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  // Brand Identity Projects (20-28)
  "20": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Brand Identity", description: "Comprehensive visual system for corporate identity" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "21": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Logo Design", description: "Distinctive visual mark representing brand values" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "22": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Visual System", description: "Coordinated design elements for consistent brand expression" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "23": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Retail Branding", description: "Cohesive identity system for consumer-facing environments" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
"24": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Corporate Identity", description: "Professional brand system for business communications" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "25": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Brand Refresh", description: "Updated identity maintaining brand equity while modernizing appeal" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "26": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Product Branding", description: "Distinctive identity system for consumer product line" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "27": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Digital Brand", description: "Interactive identity system for online user experiences" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  },
  
  "28": {
    layout: "horizontal",
    heroStyle: {
      textPosition: "bottom-left",
      overlayOpacity: 0.4,
      imageStyle: "cover",
      imageColorFilter: "none",
    },
    galleryConfig: {
      spacing: "medium",
      imageEffects: {
        hover: "scale",
        transition: "medium",
      },
      customImageStyles: {
        0: { aspectRatio: "21/9", colSpan: 2 },
        1: { aspectRatio: "16/9", colSpan: 2 },
        2: { aspectRatio: "16/9", colSpan: 1 },
        3: { aspectRatio: "16/9", colSpan: 1 },
        4: { aspectRatio: "16/9", colSpan: 1 },
        5: { aspectRatio: "16/9", colSpan: 1 },
      },
      imageText: {
        0: { title: "Brand Guidelines", description: "Comprehensive system for consistent brand application" }
      }
    },
    contentStyle: {
      textSize: "medium",
      descriptionColumns: 1,
    }
  }
};

// Helper function to get layout configuration with fallback to default
export const getProjectLayout = (projectId) => {
  const id = projectId.toString();
  return projectLayouts[id] || projectLayouts.default;
};

// Helper function to clone a layout template
export const cloneLayoutTemplate = (templateName) => {
  if (!projectLayouts.templates[templateName]) {
    return projectLayouts.default;
  }
  
  return JSON.parse(JSON.stringify(projectLayouts.templates[templateName]));
};

// Helper function to apply horizontal optimization to any project layout
export const optimizeForHorizontalImages = (projectId) => {
  const id = projectId.toString();
  const layout = projectLayouts[id] || projectLayouts.default;
  
  // Ensure all image styles use horizontal-friendly aspect ratios
  const optimizedLayout = JSON.parse(JSON.stringify(layout));
  
  optimizedLayout.layout = "horizontal";
  
  // Update custom image styles to prioritize horizontal presentation
  if (optimizedLayout.galleryConfig && optimizedLayout.galleryConfig.customImageStyles) {
    for (const key in optimizedLayout.galleryConfig.customImageStyles) {
      const style = optimizedLayout.galleryConfig.customImageStyles[key];
      
      // First image always gets full width treatment
      if (key === "0") {
        style.aspectRatio = "21/9";
        style.colSpan = 2;
      } 
      // Second image also gets full width but slightly different ratio
      else if (key === "1") {
        style.aspectRatio = "16/9";
        style.colSpan = 2;
      }
      // Other images maintain horizontal aspect ratio but in half-width layout
      else {
        style.aspectRatio = "16/9";
        style.colSpan = 1;
      }
    }
  }
  
  return optimizedLayout;
};

export default projectLayouts;