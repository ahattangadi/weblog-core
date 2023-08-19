---
title: The Enigma Machine's Ingenious Encryption
date: 2023-08-19
tags: uncategorized
excerpt: "Almost, uncrackable ..."
header:
    overlay_image: /assets/images/headers/enigma.jpg
    overlay_filter: 0.5
    caption: "Photo credit: Christian Lendi, Unsplash"
    teaser: /assets/images/headers/enigma.jpg
---

During the Second World War, once the Germans started using wireless communication systems, the need for encryption emerged. The encryption technique of choice for Nazi Germany was the Enigma Machine — one believed to be uncrackable. Quite ironically, the Enigma machine, one of the hardest ciphers to crack was based upon the weakest cipher, the Caesar cipher.


**Understanding the machine**

While there were many versions of the Enigma machine, I'll be focusing on the first few — all the others just expanded upon their concepts while the core remained the same.
The machine was made up of 5 main components: a keyboard, plugboard, 3 interchangeable rotors, a reflector, and a lamp board.

When a key was pressed on the keyboard, an electric signal passed through the plugboard, through the 3 rotors, through the reflector, back through the 3 rotors, plugboard, and finally the enciphered letter would illuminate on the lapboard.

The plugboard allowed up to 10 pairs of letters to be swapped with one another. Swapping an A --> K for example, would lead to all 'K's being made into 'A's (before and after encryption) for example.

Each machine had 3/more rotors, each having a distinct wiring configuration - which could be interchanged in the 3 rotor slots. Each rotor spun at different intervals. The third rotor spinning on each keypress, the second after 26 rotations of the third rotor, and the first spinning every 26 rotations of the second rotor ( = 26*26 = 676 rotations).
Each rotor had a turnover notch on which the next rotor would be turned. This meant that a letter would always be encrypted into a different letter, never repeated, and never itself. Older models included only 1 turnover notch, but with the introduction of newer models, rotors VI, VII, and VIII had two turnover notches. 

The rotors also had offsets, which would change their starting positions. If the starting position of a rotor was a B, the letter A would get encoded as a B, and then passed on as a B to the next rotor. 

While the wiring of the rotors couldn't be changed, you could change the order of the rotors and their starting positions. Those settings were changed each day during the war, generating an enormous number of possible encryption paths for a letter. 

Here's an example of how the signal would pass through the rotors:

[![An image explaining how the rotors of enigma functioned](/assets/images/enigma_rotors.png)](/assets/images/enigma_rotors.png)

Once the signals passed through all the three rotors, it would be passed into a reflector. A reflector is quite similar to the rotor, however, it wouldn't rotate or change position—it had a fixed position which couldn't be changed. However, there were 3 reflectors - A, B, and C. Once the reflector encoded the letter, the signal would be again passed through the rotors, this time in the backwards direction.

This new signal was passed through the plugboard and the letter would be swapped once again, and then finally, the letter would be illuminated on the plugboard.

[![An image showing how the signals passed through an enigma machine](/assets/images/enigma_functioning.png)](/assets/images/enigma_functioning.png)

While the core principles of Enigma weren't so complicated, the sheer number of possibilities, settings, and randomness led to it being considered an unbreakable device for a long time.





 