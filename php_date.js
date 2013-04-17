
/**
 * A javascript equivalent of PHP’s date()
 * 
 * @author Wang.S.W
 * 
 * @param {String} format
 * @param {String|Number|Date|undefined} date
 * @returns {String}
 * 
 * @example
 * var str1 = php_date("Y-m-d H:i:s");
 * var str2 = php_date("c", new Date());
 * var str3 = php_date("r", "2013/04/17 15:16:00");
 * var str4 = php_date("U", Date.now());
 * 
 * @see http://php.net/manual/en/function.date.php
 * 
 * ## Supported format chars:
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
 * 
 * ## Unsupported format chars:
 *  z : The day of the year (starting from 0)
 *  W : ISO-8601 week number of year, weeks starting on Monday
 *  t : Number of days in the given month
 *  L : Whether it's a leap year
 *  o : ISO-8601 year number. This has the same value as Y, except that
 *          if the ISO week number (W) belongs to the previous or next year, that year is used instead
 *  B : Swatch Internet time
 *  u : Microseconds
 *  e : Timezone identifier
 *  I : Whether or not the date is in daylight saving time
 *  T : Timezone abbreviation
 * 
 */

var php_date = (function(){
	var AbbrWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		Weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		AbbrMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		DayIndexes = ["st", "nd", "rd", "th"];
	function lead_0(v) {
		return (v < 10 ? "0" : "") + v;
	}
	function echo(format, date) {
		if (!(date instanceof Date)) {
			date = date === undefined ? new Date() : new Date(date);
		}
		var year = date.getFullYear(),
			month = date.getMonth(),
			week = date.getDay(),
			day = date.getDate(),
			hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds(),
			milliseconds = date.getMilliseconds(),
			offset = -date.getTimezoneOffset(),
			offsetSign = offset < 0 ? "-" : "+",
			offsetHour = Math.floor(Math.abs(offset) / 60),
			offsetMinute = Math.abs(offset) % 60,
			hour12 = hour % 12,
			escaping = false,
			a = [],
			c, i;
		if (hour12 == 0) {
			hour12 = 12;
		}
		for (i = 0; i < format.length; ++ i) {
			c = format.charAt(i);
			// escaping
			if (escaping) {
				a.pop();
				a.push(c);
				escaping = false;
				continue;
			}
			switch (c) {
				// Day
				case "d":
					a.push(lead_0(day));
					break;
				case "D":
					a.push(AbbrWeeks[week]);
					break;
				case "j":
					a.push(day);
					break;
				case "l":
					a.push(Weeks[week]);
					break;
				case "N":
					a.push(week == 0 ? 7 : week);
					break;
				case "S":
					a.push(DayIndexes[day % 10 > 3 ? 3 : day % 10 - 1]);
					break;
				case "w":
					a.push(week);
					break;
				// Month
				case "F":
					a.push(Months[month]);
					break;
				case "m":
					a.push(lead_0(month + 1));
					break;
				case "M":
					a.push(AbbrMonths[month]);
					break;
				case "n":
					a.push(month + 1);
					break;
				// Year
				case "Y":
					a.push(year);
					break;
				case "y":
					a.push(lead_0(year % 100));
					break;
				// Time
				case "a":
					a.push(hour < 12 ? "am" : "pm");
					break;
				case "A":
					a.push(hour < 12 ? "AM" : "PM");
					break;
				case "g":
					a.push(hour12);
					break;
				case "G":
					a.push(hour);
					break;
				case "h":
					a.push(lead_0(hour12));
					break;
				case "H":
					a.push(lead_0(hour));
					break;
				case "i":
					a.push(lead_0(minute));
					break;
				case "s":
					a.push(lead_0(second));
					break;
				// Timezone
				case "O":
					a.push(offsetSign + lead_0(offsetHour) + lead_0(offsetMinute));
					break;
				case "P":
					a.push(offsetSign + lead_0(offsetHour) + ":" + lead_0(offsetMinute));
					break;
				case "Z":
					a.push(offset * 60);
					break;
				// Full Date/Time
				case "c":
					a.push(echo("Y-m-d\\TH:i:sP", date));
					break;
				case "r":
					a.push(echo("D, d M Y H:i:s O", date));
					break;
				case "U":
					a.push(Math.floor(date.getTime() / 1e3));
					break;
				// escape back slashes
				case "\\":
					escaping = true;
					a.push(c);
					break;
				// others: print as-is
				default:
					a.push(c);
			}
		}
		return a.join("");
	}
	return echo;
})();
