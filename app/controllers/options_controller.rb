class OptionsController < ApplicationController
  def update
    option = Option.find_by(id: params[:id])
    option.increment!(:click_count)
    render status: :ok, json: { option: option }
  end
end
