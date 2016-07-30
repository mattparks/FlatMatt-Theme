function Page(id, path, element) {
  this.id = id;
  this.path = path;
  this.element = element;
  this.visible = false;
  this.divHeight = 0;
  this.progressInto = 0;
}

var pages = [
  new Page(0, "./html/buttons.html", "buttons"),
  new Page(1, './html/checkboxes.html', "checkboxes"),
  new Page(2, "./html/radiobuttons.html", "radio-buttons"),
  new Page(3, "./html/dropdowns.html", "dropdowns"),
  new Page(4, "./html/grids.html", "grids"),
  new Page(5, "./html/tables.html", "tables"),
  new Page(6, "./html/forms.html", "forms"),
];
var pagesHeight = 0;

$(document).ready(function() {
  loadNext(0);

  setTimeout(function() {
    $("body").append('<script src="./js/style.js"></script>');
    $("body").append('<script src="./js/prism.js"></script>');
  }, 750);

  setTimeout(function() {
    updatePages();
  }, 1000);
});

function loadNext(i) {
  console.log("[" + i + "]: " + " loading " + pages[i].element + " page!");

  $.get(pages[i].path, function (data) {
    // Load page content
    $("#main").append(data);
    $("#" + pages[i].element).css("left", i % 2 ? "-100%" : "200%");

    // Register next page, or end.
    var nextI = i + 1;

    if (nextI < pages.length) {
      loadNext(nextI);
    }
  });
}

$(window).resize(function() {
  updatePages();
});

$(window).on('scroll', function() {
  updatePages();
});

function updatePages() {
  var pageBottom = $(document).scrollTop() + $(window).height();
  pagesHeight = 0;

  for (var i = 0; i < pages.length; i++) {
    pages[i].divHeight = $("#" + pages[i].element).height();
    pages[i].progressInto = pageBottom - pagesHeight;

    if (!pages[i].visible && pages[i].progressInto >= 0) {
      reveal(pages[i]);
    }

    pagesHeight += pages[i].divHeight;
  }
}

function reveal(object) {
  console.log("Activating " + object.element);
  object.visible = true;

  $("#" + object.element).animate({
    left: "0",
  }, 1000, function() {
  });
}
