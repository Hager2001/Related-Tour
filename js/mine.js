const items = document.querySelectorAll("button");
const products = document.querySelectorAll(".tab-pane p div");

items.forEach((item) => {
  // Active
  item.addEventListener("click", () => {
    items.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");

    // Filter
    const valueAttr = item.getAttribute("data-filter");
    products.forEach((item) => {
      item.style.display = "none";
      if (
        item.getAttribute("data-filter").toLowerCase() ==
          valueAttr.toLowerCase() ||
        valueAttr == "all"
      ) {
        item.style.display = "flex";
      }
    });
  });
});

// ==============================

const faqItemHead = document.querySelectorAll(".faq-item-head");

faqItemHead.forEach((head, index) => {
  head.addEventListener("click", () => {
    let icon = head.querySelector(".faq-item-icon").firstElementChild;
    if (icon.className == "fa fa-chevron-down") {
      head.nextElementSibling.classList.add("show-para");
      icon.className = "fa fa-chevron-up";
    } else if (icon.className == "fa fa-chevron-up") {
      head.nextElementSibling.classList.remove("show-para");
      icon.className = "fa fa-chevron-down";
    }
  });
});

// ================================

class readMore {
  constructor() {
    this.content = ".readmore__content";
    this.buttonToggle = ".readmore__toggle";
  }

  bootstrap() {
    this.setNodes();
    this.init();
    this.addEventListeners();
  }

  setNodes() {
    this.nodes = {
      contentToggle: document.querySelector(this.content),
    };

    this.buttonToggle = this.nodes.contentToggle.parentElement.querySelector(
      this.buttonToggle
    );
  }

  init() {
    const { contentToggle } = this.nodes;

    this.stateContent = contentToggle.innerHTML;

    contentToggle.innerHTML = `${this.stateContent.substring(0, 500)}...`;
  }

  addEventListeners() {
    this.buttonToggle.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event) {
    const targetEvent = event.currentTarget;
    const { contentToggle } = this.nodes;

    if (targetEvent.getAttribute("aria-checked") === "true") {
      targetEvent.setAttribute("aria-checked", "false");
      contentToggle.innerHTML = this.stateContent;
      this.buttonToggle.innerHTML = "Show less";
    } else {
      targetEvent.setAttribute("aria-checked", "true");
      contentToggle.innerHTML = `${this.stateContent.substring(0, 500)}...`;
      this.buttonToggle.innerHTML = "Show more";
    }
  }
}

const initReadMore = new readMore();
initReadMore.bootstrap();

// ==========================
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion, index) => {
  const header = accordion.querySelector(".accordion__header");
  const content = accordion.querySelector(".accordion__content");
  const icon = accordion.querySelector("#accordion-icon");

  header.addEventListener("click", () => {
    const isOpen = content.style.height === `${content.scrollHeight}px`;

    accordions.forEach((a, i) => {
      const c = a.querySelector(".accordion__content");
      const ic = a.querySelector("#accordion-icon");

      c.style.height = i === index && !isOpen ? `${c.scrollHeight}px` : "0px";
      ic.classList.toggle("ri-add-line", i !== index || !isOpen);
      ic.classList.toggle("ri-subtract-fill", i === index && !isOpen);
    });
  });
});

// ====================================
var TabBlock = {
  s: {
    animLen: 200,
  },

  init: function () {
    TabBlock.bindUIActions();
    TabBlock.hideInactive();
  },

  bindUIActions: function () {
    $(".tabBlock-tabs").on("click", ".tabBlock-tab", function () {
      TabBlock.switchTab($(this));
    });
  },

  hideInactive: function () {
    var $tabBlocks = $(".tabBlock");

    $tabBlocks.each(function (i) {
      var $tabBlock = $($tabBlocks[i]),
        $panes = $tabBlock.find(".tabBlock-pane"),
        $activeTab = $tabBlock.find(".tabBlock-tab.is-active");

      $panes.hide();
      $($panes[$activeTab.index()]).show();
    });
  },

  switchTab: function ($tab) {
    var $context = $tab.closest(".tabBlock");

    if (!$tab.hasClass("is-active")) {
      $tab.siblings().removeClass("is-active");
      $tab.addClass("is-active");

      TabBlock.showPane($tab.index(), $context);
    }
  },

  showPane: function (i, $context) {
    var $panes = $context.find(".tabBlock-pane");

    // Normally I'd frown at using jQuery over CSS animations, but we can't transition between unspecified variable heights, right? If you know a better way, I'd love a read it in the comments or on Twitter @johndjameson
    $panes.slideUp(TabBlock.s.animLen);
    $($panes[i]).slideDown(TabBlock.s.animLen);
  },
};

$(function () {
  TabBlock.init();
});

// ==================================
$(".recr-content").click(function () {
  $(".recr-content").removeClass("active");
  $(this).addClass("active");
});
