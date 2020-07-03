import { mount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

describe('app-modal', () => {
  let wrapper = mount(Modal, {});

  it("Should contain a content and span'", () => {
    expect(wrapper.contains('span')).toBe(true);
    expect(wrapper.contains('.modal-content')).toBe(true);
  });

  it("Display should be none by default'", () => {
    expect(wrapper.attributes().style).toMatch('display: none');
  });

  it("Display should be change'", async () => {
    await wrapper.setProps({
      open: true
    });

    expect(wrapper.attributes().style).toMatch('display: block');
  });

  it("@close should $emit 'dismiss' ", async () => {
    await wrapper.find('span').trigger('click');
    expect(wrapper.emitted().dismiss).toBeTruthy();
  });

  describe('Should render slots properly', () => {
    const header = "<h3 class='header'>This is a h3</h3>";
    const body = "<div class='alert alert-success'><p>This is a random content</p></div>";
    const footer = "<div class='footer'><button>close</button></div>";

    it('Should not render header nor footer', () => {
      let wrapper = mount(Modal, {
        slots: {
          body
        }
      });
      expect(wrapper.contains('.header')).toBe(false);
      expect(wrapper.contains('.alert')).toBe(true);
      expect(wrapper.contains('.footer')).toBe(false);
    });

    it('Should now render header and footer', async () => {
      wrapper = mount(Modal, {
        slots: {
          body,
          header,
          footer
        }
      });

      expect(wrapper.contains('.header')).toBe(true);
      expect(wrapper.contains('.alert')).toBe(true);
      expect(wrapper.contains('.footer')).toBe(true);
    });
  });
});
