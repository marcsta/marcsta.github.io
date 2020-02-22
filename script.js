document.addEventListener("DOMContentLoaded", function() {
  var self = this;
  this.elements = {
    header: {
      container: function() {
        return document.getElementById("menu-header-container");
      },
      hamburgerMenu: function() {
        return document.getElementById("menu-hamburger-menu");
      }
    },
    sidebar: {
      overlay: function() {
        return document.getElementById("menu");
      },
      wrapper: function() {
        return document.getElementById("menu-wrapper");
      }
    }
  };
  this.binds = function() {
    var sideLinks = document.querySelectorAll(".sidebar-wrapper li a");
    sideLinks.forEach(function(link) {
      link.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector("body").classList.remove("disable-scroll");
        self.elements.header.hamburgerMenu().classList.remove("active");
        self.elements.sidebar.overlay().classList.remove("active");
        self.elements.sidebar.wrapper().classList.remove("active");
        self.elements.header.container().classList.remove("sidebar-open");
      });
    });

    // Changes header colour after scrolled by 100px
    window.addEventListener("scroll", function(e) {
      var scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      if (scrollTop > 100) {
        if (self.elements.header.container()) {
          self.elements.header.container().classList.add("scrolled");
        }
      } else {
        if (self.elements.header.container()) {
          self.elements.header.container().classList.remove("scrolled");
        }
      }
    });

    // Hamburger menu
    if (this.elements.header.hamburgerMenu()) {
      self.elements.header
        .hamburgerMenu()
        .addEventListener("click", function(e) {
          e.preventDefault();

          this.classList.toggle("active");
          document.querySelector("body").classList.toggle("disable-scroll");
          self.elements.sidebar.overlay().classList.toggle("active");
          self.elements.sidebar.wrapper().classList.toggle("active");
          self.elements.header.container().classList.toggle("sidebar-open");
        });
    }

    // Hide sidebar when click target is not a link
    if (this.elements.sidebar.overlay()) {
      self.elements.sidebar.overlay().addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector("body").classList.remove("disable-scroll");
        if (e.target.tagName.toLowerCase() !== "a") {
          self.elements.header.hamburgerMenu().classList.remove("active");
          self.elements.sidebar.overlay().classList.remove("active");
          self.elements.sidebar.wrapper().classList.remove("active");
          self.elements.header.container().classList.remove("sidebar-open");
        }
      });
    }
  };

  this.binds();
});