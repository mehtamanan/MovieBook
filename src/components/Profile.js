import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar'; // eslint-disable-line
import { sharedStyles, images, colors } from '../utils/';
import { Section, Button, Feed } from '../components';

class Profile extends Component {
  // must pass id, username, first_name,
  // last_name, bio, profile_picture, followings,
  // followers, isFollowed, feed, isSelf and onUsernamePress props

  renderEditProfileButton() {
    const { buttonTextStyle } = sharedStyles
    const { isSelf, isFollowed } = this.props
    if (isSelf) {
      return (
        <Button style={{ flex: 1 }}>
          <Text style={[buttonTextStyle, { fontSize: 13 }]}>
            Edit Profile
          </Text>
        </Button>
      )
    }

    if (isFollowed) {
      return (
        <Button style={{ flex: 1, backgroundColor: colors.WHITE }}>
          <Text
            style={[
              buttonTextStyle,
              { backgroundColor: 'transparent', color: colors.THEME_RED, fontSize: 13 }
            ]}
          >
            Following
          </Text>
        </Button>
      )
    }

    return (
      <Button style={{ flex: 1 }}>
        <Text style={[buttonTextStyle, { fontSize: 13 }]}>
          Follow
        </Text>
      </Button>
    )
  }

  render() {
    const {
      first_name,
      last_name,
      bio,
      profile_picture,
      followings,
      followers,
      feed
    } = this.props
    const { avatar } = images
    const {
      imageStyle,
      outerSectionOverride,
      blockStyle
    } = styles;
    const {
      simpleFontStyle,
      smallFontStyle
    } = sharedStyles;

    return (
      <View style={{ flex: 1 }} >

        <Section style={outerSectionOverride} >

          <Section style={{ justifyContent: 'space-between' }} >
            <Image style={imageStyle} source={{ uri: profile_picture }} defaultSource={avatar} />

            <Section style={{ flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 30 }}>
              <Section style={{ flex: 2 }}>
                <Section style={blockStyle}>
                  <Text style={[simpleFontStyle, { fontSize: 18 }]} >
                    {feed.length}
                  </Text>
                  <Text style={smallFontStyle}>
                    posts
                  </Text>
                </Section>

                <Section style={blockStyle}>
                  <Text style={[simpleFontStyle, { fontSize: 18 }]}>
                    {followers.length}
                  </Text>
                  <Text style={smallFontStyle}>
                    followers
                  </Text>
                </Section>

                <Section style={blockStyle}>
                  <Text style={[simpleFontStyle, { fontSize: 18 }]} >
                    {followings.length}
                  </Text>
                  <Text style={smallFontStyle}>
                    followings
                  </Text>
                </Section>
              </Section>

              <Section style={{ flex: 1 }}>
                {this.renderEditProfileButton()}
              </Section>
            </Section>

          </Section>

          <Text style={[simpleFontStyle, { paddingTop: 10 }]}>
            {`${first_name} ${last_name}`}
          </Text>

          <Text style={smallFontStyle}>
            {bio}
          </Text>

        </Section>

        <View
          style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: 'black' }}
        />
        <Section style={{ flex: 1 }}>
          <Feed posts={feed} onUsernamePress={this.props.onUsernamePress} />
        </Section>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  blockStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  outerSectionOverride: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
  }
});

export { Profile };
