import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      optional: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    isFavourite: {
      type: Boolean,
      optional: true,
    },
    contactType: {
      type: String,
      optional: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
