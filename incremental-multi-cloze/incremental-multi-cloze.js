<script>
  // **************************************************
  // Configuration: User Settings
  // **************************************************
  
  // What key is used to advance? 
  let keyToPress = 'n';

  // Is click based navigation enabled?
  let clickBasedNavigationIsEnabled = true;

  // What text should be shown for a hidden cloze? 
  let textForHiddenCloze = "[...]";


  // **************************************************
  // Configuration: State
  // **************************************************

  // Store necessary values for hiding clozes
  let clozes;
  let cloze_answers;
  let next_cloze_to_show;
  let cloze_answer_clicked_from_front;

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


  // **************************************************
  // Configuration: Front of Card
  // **************************************************

  // Configures click based navigation for front of card
  function configure_front_of_card() {
    cloze_answer_clicked_from_front = null;

    if (!clickBasedNavigationIsEnabled) {
      return
    }

    clozes = document.getElementsByClassName("cloze");
    for (i = 0; i < clozes.length; i++) {
      let preservedIdx = i
      clozes[i].onclick = function() { 
        cloze_answer_clicked_from_front = preservedIdx;
        show_answer()
      }
      clozes[i].style.cursor = 'pointer';
    }
  }


  // **************************************************
  // Configuration: Back of Card
  // **************************************************

  // Invoke once the back card is visible because the cloze elements get reloaded
  function populate_necessary_values() {
    clozes = document.getElementsByClassName("cloze");
    cloze_answers = [];
    if (clozes) {
      for (i = 0; i < clozes.length; i++) {
        cloze_answers.push(clozes[i].innerHTML);
        
        if (clickBasedNavigationIsEnabled) {
          let preservedIdx = i; 
          clozes[i].style.cursor = 'pointer';
          clozes[i].onclick = function () { this.innerHTML = cloze_answers[preservedIdx] };
        }
      }
    }
  }

  // Hides all the cloze elements
  function hide_all_clozes() {
    next_cloze_to_show = 0
    for (i = next_cloze_to_show; i < clozes.length; i++) {
      clozes[i].innerHTML = textForHiddenCloze;
    }
  }

  // Reveals the first cloze (either the first cloze or the one clicked by the user)
  function reveal_first_cloze() {
    if (cloze_answer_clicked_from_front != null) {
      clozes[cloze_answer_clicked_from_front].innerHTML = cloze_answers[cloze_answer_clicked_from_front];
      cloze_answer_clicked_from_front = null;
      return
    }
    
    if (clozes.length > 0) {
      clozes[0].innerHTML = cloze_answers[0]
    }
  }

  // Configures the back of the card
  function configure_back_of_card() {
    populate_necessary_values();
    hide_all_clozes();
    reveal_first_cloze();
  }


  // **************************************************
  // Configuration: Observe Navigation
  // **************************************************

  // Add observer to configure cards when `front-of-card` or `back-of-card` appears
  const observer = new MutationObserver(function(mutations_list) {
    mutations_list.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(added_node) {
        if (added_node.id == 'front-of-card') {
          configure_front_of_card();
        }

        if(added_node.id == 'back-of-card') {
          configure_back_of_card();
        }
      });
    });
  });

  observer.observe(document.querySelector("body"), { subtree: true, childList: true });


  // **************************************************
  // Configuration: Keypress Handling
  // **************************************************

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
      let clozeWasAlreadyRevealedByClick = clozes[next_cloze_to_show].innerHTML != textForHiddenCloze;
      if (clozeWasAlreadyRevealedByClick) {
        next_cloze_to_show += 1;
        keypressHandler();
      } else {
        clozes[next_cloze_to_show].innerHTML = cloze_answers[next_cloze_to_show];
        next_cloze_to_show += 1;
      }
    }
  }

  // Register event listener for `keyToPress` keypress
  document.addEventListener('keypress', function(event) {
      var key = event.key || event.keyCode; 
      if (event.key == keyToPress) {
        keypressHandler();
      }
  })


  // **************************************************
  // Configuration: Initial Script Load
  // **************************************************

  // Need to run once to support the first card reviewed
  configure_front_of_card();
</script>