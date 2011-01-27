# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_ianphoto_session',
  :secret      => 'ddaa63c52f20964d7c95571649c0b2a206028f8ada3079c8e7d9ce093815e03778e3adf1da3ce6f64748372a8c36ab382935da863ed9eb0a73e667cac0c30abe'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
