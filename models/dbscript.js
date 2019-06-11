var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var data_model = mongoose.model('dataModel',new Schema({Change_Type:String, Covered_Recipient_Type:String, Noncovered_Recipient_Entity_Name:String, Teaching_Hospital_CCN:String, Teaching_Hospital_ID:String, Teaching_Hospital_Name:String, Physician_Profile_ID:String, Physician_First_Name:String, Physician_Middle_Name:String, Physician_Last_Name:String, Physician_Name_Suffix:String, Recipient_Primary_Business_Street_Address_Line1:String, Recipient_Primary_Business_Street_Address_Line2:String, Recipient_City:String, Recipient_State:String, Recipient_Zip_Code:String, Recipient_Country:String}), 'things');


module.exports.getUser = function (fname, mname, lname) {
    try {
	return data_model.findOne({Physician_First_Name:fname, Physician_Middle_Name:mname, Physician_Last_Name:lname});
    } catch(err) {
	console.log(err);
    }
}
