class PollsController < ApplicationController
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def show
    poll = Poll.find(params[:id])
    options = poll.options
    total_clicks = poll.options.sum(:click_count)
    render status: :ok, json: { poll: poll, options: options, total_clicks: total_clicks }
  end

  def create
    @poll = Poll.create(poll_params)
    @poll.options.create(poll_options[:options])
    render status: :ok, json: { poll: @poll, options: @poll.options }
  end

  def destroy
    poll = Poll.find(params[:id])
    poll.destroy
  end

  def update
    poll = Poll.find(params[:id])
    poll.update(poll_params)
    poll.options.upsert_all(poll_options[:options])
    render status: :ok, json: { poll: poll, options: poll.options }
  end

  private

  def poll_params
    params.require(:poll).permit(:title)
  end

  def poll_options
    params.require(:poll).permit(options: [:id, :title, :created_at, :updated_at])
  end
end
