require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "John",
                        last_name: "doe",
                        email: "john@example.com",
                        password: "password",
                        password_confirmation: "password")
  end

  test "user should be valid" do
    assert @user.valid?, "user is valid"
  end

  test "first name should be present" do
    @user.first_name = " "
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  test "instance of user" do
    assert_instance_of User, @user
  end

  test "not instance of user" do
    poll = Poll.new
    assert_not_instance_of User, poll
  end

  test "error raised" do
    assert_raises ActiveRecord::RecordNotFound do
      User.find(SecureRandom.uuid)
    end
  end

  test "user should have unique auth token" do
    @user.save!
    new_user = User.create!(first_name: "jane",
                            last_name: "doe",
                            email: "jane@gmail.com",
                            password: "password",
                            password_confirmation: "password")

    assert_not_same @user.authentication_token,
                    new_user.authentication_token
  end

  test "user should not be valid without email" do
    @user.email = ""
    assert @user.invalid?, "email should not be empty"
  end

  test "password should not be empty" do
    @user.password = nil
    assert_not @user.save
    assert_equal ["Password can't be blank"],
                 @user.errors.full_messages
  end

  test "first name should be of valid length" do
    @user.first_name = "a" * 51
    assert @user.invalid?
  end

  test "last name should be of valid length " do
    @user.last_name = "a" * 51
    assert @user.invalid?
  end

  test "validation of the email length" do
    @user.email = ("a" * 50) + "@gmail.com"
    assert @user.invalid?
  end

  test "password should be atleast 6 chars long" do
    @user.password = "hello"
    assert @user.invalid?
    assert_equal ["is too short (minimum is 6 characters)"], @user.errors[:password]

    @user.password = "password"
    assert @user.valid?
  end

  test "uniqueness of the user" do
    @user.save!
    dup_user = @user.dup
    assert_not dup_user.valid?

    assert_equal ["Email has already been taken"],
                 dup_user.errors.full_messages
  end

  test "email with valid format" do
    valid_emails = %w[email@gmail.com email123@gmail.com
                      email-1@gmail.in email+3@yahoo.com]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  test "email with invalid format" do
    invalid_emails = %w[email@gmail,com email_user.org hello.world@gmail.@.com
                        dontknow+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end
end
