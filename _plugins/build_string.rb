
module Jekyll

  class BuildString < Liquid::Tag

    def initialize(tag_name, args, token)
      @buildString = ENV['TRAVIS_COMMIT'] || Time.now.to_i
      super
    end

    def render(context)
      @buildString
    end
  end
end

Liquid::Template.register_tag('build_str', Jekyll::BuildString)
