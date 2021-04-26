class AddClickCountToOptions < ActiveRecord::Migration[6.1]
  def change
    add_column :options, :click_count, :integer, default: 0
  end
end
