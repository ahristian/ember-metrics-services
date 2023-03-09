import { module, test } from 'qunit';
import { setupRenderingTest } from 'gridium/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | bar-plot', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<BarPlot />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <BarPlot>
        template block text
      </BarPlot>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
