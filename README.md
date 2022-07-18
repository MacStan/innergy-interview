## Notes about the solution

### Handling discounts
When it comes to discounts I've decided to handle every specific one explicitely. While it is true that some of them stay the same throught all three years, they are - in principle - set arbitrarily by the client, and they could change in an unforseeable manner.

### Handling dependent services
Using same scheme (espiecially having different set of rules for every year) with regards to dependent services makes less sense. It seems reasonable to assume that pairing of TwoDayService and WeddingSession will not be possible in future, as the nature of those services is constant.

### Currency types
Using `number` for currency operations is not optimal, problems with rounding of floating point numbers can be dangerous when working with money.
Optimally either a specific library, or at least `bigint` should be used. 
That would require changing significant portion of unit tests and the solution would remain essentialy the same (besides chaging every number to `bigint`), so I refrained from doing so.

### TODO 
[x] Check for corner cases with properties not existing on objects