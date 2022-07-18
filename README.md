## Notes about the solution

### Handling discounts
When it comes to discounts I've decided to handle every specific one explicitely. While it is true that some of them stay the same throught all three years, that is purely coincidental, and in future years it may change in an unpredictable manner. Applying specific discounts to every year seems to better reflect bussines nature of those discounts. 

Expressing every discount as a separate rule is not always the most readable approach. Function `freeOrDiscountedWeddingSessionDiscount` is an example of this, it could be split into two simpler methods one with Photography + WeddingSession and another with VideoRecording + WeddingSession - Photography. That second example would be counterintuitive as it has to check that there is no Photography, not because it's required

Using same scheme with regards to dependent services makes less sense. It seems reasonable to assume that WeddingSession will remain a single day event and by itself will make no sense with TwoDayService in the future years. 

### Currency types
Using `number` for currency operations is not optimal, problems with rounding of floating point numbers can be dangerous when working with money.
Optimally either a specific library, or at least BigInt should be used. 
That would require changing significant portion of unit tests and the solution would remain essentialy the same (besides chaging every number to `bigint`), I refrained from doing so. 

### TODO 
[] Check for corner cases with properties not existing on objects