// Initialize the Locomotive scroll
  const scroller = new LocomotiveScroll({
    el: pageContainer,
    inertia: 0.8,
    smooth: true,
    getDirection: true,
    mobile: {
      breakpoint: 0,
      smooth: false,
      getDirection: true,
    },
    tablet: {
      breakpoint: 0,
      smooth: false,
      getDirection: true,
    },
  });