
// I prefer that i use class instead if function(s)
// For simplicity, I didn't implement UX feature, so I either return true or false, to indicate valid and invlid input(s), So I didnt tell where the an error occur but 
// doing it is not a big deal
class User {
  constructor(fullName, email, username, birthdate, website, address) {
    this.fullName = fullName;
    this.email = email;
    this.username = username;
    this.birthdate = birthdate;
    this.website = website;
    this.address = address;
  };

  validateFullName () {
    const format = /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/;
    return format.test(this.fullName);
  }

  validateEmail () {
    let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return format.test(this.email);
  }

  validateBirthdate() {
    let format = /^(?<day>\d{2})-(?<month>\d{2})-(?<year>\d{4})$/;
    let result = format.exec(this.birthdate);
    if (!result) return false;
    // Note: To keep this simple, I will not check for valid date range:
    // Example: checking date.year before 1900 or after 2020
    // So below is omitted, I am going to check it is just a valid
    // check for valid year
    // check for valid month
    // check for valid day
   
    let year = result.groups.year;
    let month = result.groups.month;
    let day = result.groups.day;
    // JS one kind of date format: YYYY-mm-dd
    let _format = `${year}-${month}-${day}`;

    let isValidDate = Date.parse(_format);
    // this ensure that year, month and data character-numeric are within valid range
    if (!isValidDate) return false;

    return true;

  }

  validateWebsite () {
    let format = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
    return format.test(this.website);
  }

  validateAddress () {
    // current match format: 'No 1, Street name, Any can be here......
    let format = /^No \d,+\s[A-z]+\s[A-z]+/g;
    return format.test(this.address);
  }

  validateUsername () {
    return /^[\w]{4,}$/.test(this.username);
  }

  validate() {
    let passed = (this.validateEmail() && this.validateFullName() && this.validateUsername() && 
    this.validateWebsite() && this.validateAddress() && this.validateBirthdate());
    if (!passed) {
      console.log('Error');
    } else {
      console.log('All input passed');
    }
    return passed;

    // I wanted to loop through all the method and excute them one by one but it was failing
    // below is what I did, SO I NEED HELP here
    // let validators = [
    //   this.validateEmail,
    //   // ...other methods
    // ]

    // validators.forEach((validator, index, validators) => {
    //   let passed = validators[index]();
    //   if (!passed) return passed;
    // })
   
    // return true;
  }

}

// You can change any of this input, and run the program again
const user1 = new User(
  'Isaac Newton', 
  'newton@gmail.com',
  'newton', '02-12-2020',
  'www.fb.com', 
  'No 3, Berlin Road, Germany'
  );

 
 console.log(user1.validate())
// individual methods can also be called
//  console.log(user1.validateEmail())
