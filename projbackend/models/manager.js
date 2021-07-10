const { v4: uuidv4 } = require('uuid');

var mongoose = require("mongoose")
const crypto = require("crypto")

var managerSchema = new mongoose.Schema(
    {
        firstname: {
          type: String,
          required: true,
          maxlength: 32,
          trim: true
        },
        lastname: {
          type: String,
          maxlength: 32,
          required :true,
          trim: true
        },
        email: {
          type: String,
          trim: true,
          required: true,
          unique: true,
          lowercase:true
        },
        encry_password: {
          type: String,
          required: true
        },
        salt: String,
        role: {
          type: Number,
          default: 0
        },
      },
      { timestamps: true }
    );


    managerSchema
    .virtual("password")
    .set(function(password) {
      this._password = password;
      this.salt = uuidv4();
      this.encry_password = this.securePassword(password);
    })
    .get(function() {
      return this._password;
    });
  
    managerSchema.methods = {
    autheticate: function(plainpassword) {
      return this.securePassword(plainpassword) === this.encry_password;
    },
  
    securePassword: function(plainpassword) {
      if (!plainpassword) return "";
      try {
        return crypto
          .createHmac("sha256", this.salt)
          .update(plainpassword)
          .digest("hex");
      } catch (err) {
        return "";
      }
    }
  };

module.exports = mongoose.model("Manager",managerSchema)