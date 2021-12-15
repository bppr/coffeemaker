#### Coffee Maker

You should have Node/NPM installed.

To install dependencies, run

```
npm install
```

To run the jasmine test suite, run 
```
npm run test
```

To add test files, make sure they end in `spec.ts` or `Spec.ts`.

##### Assignment:

The previous devs left us a mess of half-completed code. I started to write some tests around it but I'd like you to try to finish for me.

Test cases we need:
* when the button is pressed, it should not start brewing if either
  * the reservoir is empty
  * the pot is not present
* when the coffee maker starts brewing, it does all
  * turns on the boiler
  * closes the release valve
  * turns on the warmer plate
* when brewing, if the button is pressed, it stops brewing and does all
  * turns off the boiler
  * turns off the plate
  * opens the release valve