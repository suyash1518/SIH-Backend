const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    companyname: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    addressd: {
        type: String,
        required: true
    },
    addressc: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    bp: {
        type: String,
        required: true
    },
    poa: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    fs: {
        type: String,
        required: true
    },
    cc: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    coapr: {
        type: String,
        required: function () {
            return this.sector === 'Ayurveda';
        }
    },
    pfail: {
        type: String,
        required: function () {
            return this.sector === 'Ayurveda';
        }
    },
    ctr: {
        type: String,
        required: function () {
            return this.sector === 'Ayurveda';
        }
    },
    ml: {
        type: String,
        required: function () {
            return (this.sector === 'Ayurveda' || this.sector === 'Homeopathy' || this.sector === 'Siddha');
        }
    },
    gmpc: {
        type: String,
        required: function () {
            return this.sector === 'Ayurveda';
        }
    },
    ypc: {
        type: String,
        required: function () {
            return this.sector === 'Yoga';
        }
    },
    tatc: {
        type: String,
        required: function () {
            return this.sector === 'Yoga';
        }
    },
    sahc: {
        type: String,
        required: function () {
            return this.sector === 'Yoga';
        }
    },
    ycr: {
        type: String,
        required: function () {
            return this.sector === 'Yoga';
        }
    },
    ntp: {
        type: String,
        required: function () {
            return this.sector === 'Naturopathy';
        }
    },
    pl: {
        type: String,
        required: function () {
            return this.sector === 'Naturopathy';
        }
    },
    fc: {
        type: String,
        required: function () {
            return this.sector === 'Naturopathy';
        }
    },
    ce: {
        type: String,
        required: function () {
            return (this.sector === 'Naturopathy' || this.sector === 'Unani');
        }
    },
    upr: {
        type: String,
        required: function () {
            return this.sector === 'Unani';
        }
    },
    pc: {
        type: String,
        required: function () {
            return this.sector === 'Unani';
        }
    },
    maqcl: {
        type: String,
        required: function () {
            return this.sector === 'Unani';
        }
    },
    spr: {
        type: String,
        required: function () {
            return this.sector === 'Siddha';
        }
    },
    fd: {
        type: String,
        required: function () {
            return this.sector === 'Siddha';
        }
    },
    ctd: {
        type: String,
        required: function () {
            return this.sector === 'Siddha';
        }
    },
    hpr: {
        type: String,
        required: function () {
            return this.sector === 'Homeopathy';
        }
    },
    pf: {
        type: String,
        required: function () {
            return this.sector === 'Homeopathy';
        }
    },
    cs: {
        type: String,
        required: function () {
            return this.sector === 'Homeopathy';
        }
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});
registrationSchema.index({ userId: 1 });

const RegistrationForm = mongoose.model('RegistrationForm', registrationSchema);

module.exports = RegistrationForm;