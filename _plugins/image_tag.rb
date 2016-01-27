
module Jekyll

  class ImageTag < Liquid::Tag
    @img = {}

    def initialize(tag_name, args, token)

      @img = {}
      if args =~ /^\s*?([^\s]+)\s+(.*)$/i
        unless $1.nil?
          @img["data-src"] = $1
          @img["alt"] = $2.split /\s+/ || [""]
          @img["alt"] = @img["alt"].join " "
        end
      end
      super
    end

    def render(context)
      unless @img.empty?
        %Q[<noscript data-src="#{@img['data-src']}" data-alt="#{@img['alt']}">
            <img src="#{@img['data-src']}" alt="#{@img['alt']}">
          </noscript>]
      else
        "Error processing input, expected syntax: {% img /path/to/image alt text %}"
      end
    end
  end
end

Liquid::Template.register_tag('lazyImg', Jekyll::ImageTag)
