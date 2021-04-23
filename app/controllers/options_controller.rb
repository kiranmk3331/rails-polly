class OptionsController < ApplicationController
  def count
    # option = Option.where(id: params[:id], poll_id: params[:poll_id])
    option = Option.find_by(id: params[:id])
    option.increment!(:click_count)
    render status: :ok, json: { option: option }
  end
end
