# Anki
Helper files for working with Anki

## Multi Cloze (Incremental)

### Usage
Import [this Anki package](incremental-multi-cloze/incremental-multi-cloze.apkg) to receive the "Cloze Multi (Incremental)" note type

### Example
Creates a single card to memorize A, B, C, D
```
Memorize {{c1::A}}, {{c1::B}}, {{c1::C}}, and {{c1::D}}.
```

Creates one card to memorize X, Y, Z and one card to memorize A, B, C
```
Remember {{c1::X}}, {{c1::Y}}, and {{c1::Z}}. But also {{c2::A}}, {{c2::B}}, and {{c2::C}}. 
```

### Configuration
To configure this note type, open the front template and customize the following portion of the script[^1]
```javascript
// **************************************************
// Configuration: User Settings
// **************************************************

// What key is used to advance? Cannot already be used by Anki (e.g. return, space bar, etc)
let keyToPress = 'n';

// Is click based navigation enabled? Either "true" or "false". 
let clickBasedNavigationIsEnabled = true;

// What text should be shown for a hidden cloze? Anything you want :)
let textForHiddenCloze = "[...]";
```

### Video Demo
https://user-images.githubusercontent.com/61445278/163032790-996e8f63-f4bd-4b50-a02b-30d6ca85ebf6.mov

[^1]: Multi Cloze (Incremental) is based on [itraveller's script](https://anki.tenderapp.com/discussions/ankidesktop/16538-opening-clozes-one-a-time). Multi Cloze (Incremental) adds a few improvements including keyboard-based navigation, click-based navigation, and fixed-length hidden clozes. The script provided by itraveller makes hidden clozes the same length as their answers. This can result in memorizing based on cloze length rather than true memorization.
