require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "John",
                        last_name: "doe",
                        email: "john@example.com",
                        password: "password",
                        password_confirmation: "password")
    @poll = Poll.new(title: "First poll title", user: @user)
    Option.delete_all
    @option = Option.new(title: "title of the option", poll: @poll)
  end

  test "instance of option" do
    assert_instance_of Option, @option
  end

  test "option is invalid without option title" do
    @option.title = ""
    assert_not @option.valid?
  end

  test "option title should be of valid length" do
    @option.title = "a" * 151
    assert_not @option.valid?
  end

  test "option should not be valid without poll" do
    @option.poll = nil
    assert_not @option.valid?
  end
end
