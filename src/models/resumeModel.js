import { model, Schema } from 'mongoose';

const resumeSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true
    },
    about: {
      full_name: {
        type: String,
        require: true
      },
      title: {
        type: String,
        require: true
      },
      description: {
        type: String,
        require: true
      },
      image: {
        type: String,
        require: true
      }
    },
    education: [
      {
        start_date: {
          type: String,
          require: true
        },
        end_date: {
          type: String,
          require: true
        },
        name: {
          type: String,
          require: true
        },
        description: {
          type: String
        }
      }
    ],
    experience: [
      {
        start_date: {
          type: String,
          require: true
        },
        end_date: {
          type: String,
          require: true
        },
        name: {
          type: String,
          require: true
        },
        description: {
          type: String
        }
      }
    ],
    address: {
      email: {
        type: String,
        require: true
      },
      mobile: {
        type: String,
        require: true
      },
      website: {
        type: String
      },
      full_address: {
        type: String,
        require: true
      }
    },
    skills: [{}],
    social: {},
    templates: {
      type: String,
      require: true,
      default: 'temp_one'
    }
  },
  { timestamps: true }
);

const resumeModel = model('resume', resumeSchema);
export default resumeModel;
