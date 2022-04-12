<script>
  // What key is used to advance? 
  let keyToPress = 'n';


  // Store necessary values for hiding clozes
  let clozes;
  let cloze_answers;
  let next_cloze_to_show;


  // Invoke once the back card is visible because the cloze elements get reloaded
  function populate_necessary_values() {
    clozes = document.getElementsByClassName("cloze");
    cloze_answers = [];
    if (clozes) {
      for (i = 0; i < clozes.length; i++) {
        cloze_answers.push(clozes[i].innerHTML);
      }
    }
  }


  // Hides all the cloze elements and gives them a temp value for visual consistency 
  function hide_clozes_from_idx(idx) {
    next_cloze_to_show = idx
    for (i = next_cloze_to_show; i < clozes.length; i++) {
      clozes[i].innerHTML = "[...]";
    } 
  }


  // Add observer for `back-of-card` to initially hide clozes
  const observer = new MutationObserver(function(mutations_list) {
    mutations_list.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(added_node) {
        if(added_node.id == 'back-of-card') {
          populate_necessary_values();
          hide_clozes_from_idx(1);
        }
      });
    });
  });

  observer.observe(document.querySelector("body"), { subtree: true, childList: true });


  // Invokes "show answer" programmatically
  function show_answer() {
    if (typeof(py) !== "undefined") {
      py.link('ans');
      return;
    }

    if (typeof(pycmd) !== "undefined") {
      pycmd('ans'); 
      return;
    }
  }


  // Determines the appropriate behavior for when `keyToPress` is pressed
  function keypressHandler() {
    if (!document.getElementById('front-of-card') && !document.getElementById('back-of-card')) {
      show_answer();
      return
    }

    if (document.getElementById('front-of-card')) {
      show_answer();
      return;
    }

    if (document.getElementById('back-of-card') && next_cloze_to_show < clozes.length) {
      clozes[next_cloze_to_show].innerHTML = cloze_answers[next_cloze_to_show];
      next_cloze_to_show += 1;
      return;
    }
  }


  // Register event listener for `keyToPress` keypress
  document.addEventListener('keypress', function(event) {
      var key = event.key || event.keyCode; 
      if (event.key == keyToPress) {
        keypressHandler();
      }
  })
</script>