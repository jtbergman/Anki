# Anki
Helper files for working with Anki

## Incremental Multi Cloze

### Usage
Import [this Anki package](incremental-multi-cloze/incremental-multi-cloze.apkg) to receive the "Cloze Multi (Incremental)" note type[^1] then install [Refocus](https://ankiweb.net/shared/info/1642550423)[^2]

### Example
Create a single card to memorize A, B, C, D.  
```
Memorize {{c1::A}}, {{c1::B}}, {{c1::C}}, and {{c1::D}}
```

Create one card to memorize X, Y, Z and one card to memorize A, B, C.
```
Remember {{c1::X}}, {{c1::Y}}, and {{c1::Z}}. But also {{c2::A}}, {{c2::B}}, and {{c2::C}}. 
```

### Video Demo
https://user-images.githubusercontent.com/61445278/162880258-5a5b7481-8a78-439b-986c-e350fbc59f72.mov


[^1]: To change the keycode used for navigation search for `let keyToPress = 'n';` in the "Cloze Multi (Incremental)" note type. Replace `n` – the default value – with your preferred keycode. You must use a value that is not already being used by Anki. For example, you cannot use the spacebar or return key. You can see the JavaScript source code [here](incremental-multi-cloze/incremental-multi-cloze.js).

[^2]: Technically, [Refocus](https://ankiweb.net/shared/info/1642550423) is not required. Without this add-on, you will need to click each card to enable keyboard-based navigation. With this add-on, you can easily navigate through all the clozes only using your keyboard. If you prefer mouse-based navigation, then it makes more sense to use [itraveller's script](https://anki.tenderapp.com/discussions/ankidesktop/16538-opening-clozes-one-a-time). Unfortunately, however, this script has variable-length hidden clozes. This means you may end up memorizing answers based on the cloze-length rather than true memorization. 
