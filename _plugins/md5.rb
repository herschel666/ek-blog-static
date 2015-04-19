require "digest/md5"

module Jekyll
  module Md5
    def md5(input)
      Digest::MD5.hexdigest(input)
    end
  end
end

Liquid::Template.register_filter(Jekyll::Md5)