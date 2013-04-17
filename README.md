# php_date.js

php_date.js is a javascript equivalent of PHP’s date().
See [PHP: date - Manual](http://php.net/manual/en/function.date.php).

## How to use

```html
<script type="text/javascript" src="php_date.js"></script>
<script type="text/javascript">
//function php_date(format, date){};
var str1 = php_date("Y-m-d H:i:s");
var str2 = php_date("c", new Date());
var str3 = php_date("r", "2013/04/17 15:16:00");
var str4 = php_date("U", Date.now());
</script>
```

That works just like:

```php
<?php
$str1 = date("Y-m-d H:i:s");
$str2 = date("c", time());
$str3 = date("r", strtotime("2013/04/17 15:16:00"));
$str4 = date("U", time());
?>
```

## Supported format chars:

 *  d : Day of the month, 2 digits with leading zeros
 *  D : A textual representation of a day, three letters
 *  j : Day of the month without leading zeros
 *  l : A full textual representation of the day of the week
 *  N : ISO-8601 numeric representation of the day of the week
 *  S : English ordinal suffix for the day of the month, 2 characters
 *  w : Numeric representation of the day of the week 
 *  F : A full textual representation of a month
 *  m : Numeric representation of a month, with leading zeros
 *  M : A short textual representation of a month, three letters 
 *  n : Numeric representation of a month, without leading zeros
 *  Y : A full numeric representation of a year, 4 digits
 *  y : A two digit representation of a year
 *  a : Lowercase Ante meridiem and Post meridiem
 *  A : Uppercase Ante meridiem and Post meridiem
 *  g : 12-hour format of an hour without leading zeros
 *  G : 24-hour format of an hour without leading zeros
 *  h : 12-hour format of an hour with leading zeros 
 *  H : 24-hour format of an hour with leading zeros
 *  i : Minutes with leading zeros 
 *  s : Seconds, with leading zeros
 *  O : Difference to Greenwich time (GMT) in hours
 *  P : Difference to Greenwich time (GMT) with colon between hours and minutes
 *  Z : Timezone offset in seconds

## Unsupported format chars:

 *  z : The day of the year (starting from 0)
 *  W : ISO-8601 week number of year, weeks starting on Monday
 *  t : Number of days in the given month
 *  L : Whether it's a leap year
 *  o : ISO-8601 year number. This has the same value as Y, except that
            if the ISO week number (W) belongs to the previous or next year, that year is used instead
 *  B : Swatch Internet time
 *  u : Microseconds
 *  e : Timezone identifier
 *  I : Whether or not the date is in daylight saving time
 *  T : Timezone abbreviation

## Testing

open ```test/index.html``` in your browser, and see the page or the console.

## License

MIT