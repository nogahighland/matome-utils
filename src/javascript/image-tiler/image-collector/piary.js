import $ from 'jquery'
import _ from 'lodash'
import Collector from './collector'
import { toAbs } from '../path'

class Piary extends Collector {
  canHandle(url) {
    return /www\.piary\.jp/.test(location.href)
  }

  getSelector() { return '.img > img' }

  getUrl($dom) {
    return  toAbs($dom.prop('src').replace('-145x145',''));
  }
}

export default Piary;
