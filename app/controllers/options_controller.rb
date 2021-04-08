class OptionsController < ApplicationController
  def count 
      option = Poll.find(params[:poll_id]).options.find(params[:option_id])
      option.increment!(:click_count)
      render status: :ok, json: {option: option}
  end
end
