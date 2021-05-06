require "test_helper"

class PollTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "John",
                        last_name: "doe",
                        email: "john@example.com",
                        password: "password",
                        password_confirmation: "password")
    Poll.delete_all

    @poll = Poll.new(title: "First poll title", user: @user)
  end

  test "instance of poll" do
    assert_instance_of Poll, @poll
  end

  test "not instance of poll" do
    assert_not_instance_of Poll, @user
  end

  test "poll returns correct title" do
    assert_equal "First poll title", @poll.title
  end

  test "error raised" do
    assert_raises ActiveRecord::RecordNotFound do
      Poll.find(SecureRandom.uuid)
    end
  end

  test "poll should not be valid without title" do
    @poll.title = ""
    assert_not @poll.valid?
  end

  test "title should be of valid length" do
    @poll.title = "a" * 101
    assert @poll.invalid?
  end
end
