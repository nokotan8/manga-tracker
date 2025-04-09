require 'roda'

class App < Roda
  route do |r|
    r.on 'register' do
      r.is do
        response.status = 404
        'test'
      end
    end
  end
end

run App.freeze.app