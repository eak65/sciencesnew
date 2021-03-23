jQuery(document).ready(() => {
  jQuery('body.include-legacy-images figure.wp-block-image')
    .css('width', '300px')
    .css('float', 'right')
    .wrapAll('<div class="clearfix legacy-image-wrapper" />');
});
