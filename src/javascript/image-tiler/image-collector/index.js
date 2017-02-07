import BasicCollector from './basic-collector'
import InstagramCollector from './instagram-collector'
import TumblrCollector from './tumblr-collector'
import TwitterCollector from './twitter-collector'

const COLLECTORS = [
  new InstagramCollector(),
  new TumblrCollector(),
  new TwitterCollector(),
  new BasicCollector()
];

function getImageUrls() {
  let imageUrls = [];
  COLLECTORS.forEach((collector) => {
    if (collector.canHandle()) {
      imageUrls = imageUrls.concat(collector.collect());
    }
  });
  return imageUrls;
}

export default getImageUrls
