import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type Signup = {
    name : Text;
    email : Text;
  };

  let signups = Map.empty<Text, Signup>();

  public shared ({ caller }) func signup(name : Text, email : Text) : async () {
    if (signups.containsKey(email)) {
      Runtime.trap("This email is already signed up!");
    };

    let signup = {
      name;
      email;
    };

    signups.add(email, signup);
  };

  public query ({ caller }) func getTotalSignups() : async Nat {
    signups.size();
  };
};
