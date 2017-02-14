import _ from 'lodash'
import AnchorCollector from './anchor-collector'
import TextNodeCollector from './text-node-collector'
import InstagramCollector from './instagram-collector'
import TumblrCollector from './tumblr-collector'
import TumblrIndividualCollector from './tumblr-individual-collector'
import TwitterCollector from './twitter-collector'

const COLLECTORS = [
  new InstagramCollector(),
  new TumblrCollector(),
  new TumblrIndividualCollector(),
  new TwitterCollector(),
  new AnchorCollector(),
  new TextNodeCollector()
];

function getImageUrls() {
  let imageUrls = [];
  COLLECTORS.forEach((collector) => {
    if (collector.canHandle()) {
      imageUrls = imageUrls.concat(collector.collect());
    }
  });
  return _.uniq(imageUrls);
}

export default getImageUrls
